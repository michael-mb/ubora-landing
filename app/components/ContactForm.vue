<script setup lang="ts">
// Si NUXT_PUBLIC_CONTACT_FORM_ENDPOINT est défini (Formspree, Web3Forms…), le formulaire y est envoyé en JSON.
// Sinon, il ouvre le client mail du visiteur avec un message pré-rempli.
const props = defineProps<{ subjects?: string[], email?: string }>()

const { contactFormEndpoint } = useRuntimeConfig().public

const form = reactive({
  name: '',
  organisation: '',
  email: '',
  phone: '',
  subject: props.subjects?.[0] ?? '',
  message: '',
  consent: false,
  website: '', // pot de miel anti-spam
})

const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')

async function submit() {
  if (form.website) return

  if (!contactFormEndpoint) {
    const body = [
      form.message,
      '',
      `Nom : ${form.name}`,
      form.organisation && `Établissement : ${form.organisation}`,
      `E-mail : ${form.email}`,
      form.phone && `Téléphone : ${form.phone}`,
    ].filter(line => line !== '').join('\n')
    window.location.href = `mailto:${props.email ?? ''}?subject=${encodeURIComponent(`[Site web] ${form.subject}`)}&body=${encodeURIComponent(body)}`
    status.value = 'sent'
    return
  }

  status.value = 'sending'
  try {
    const { website, consent, ...payload } = form
    await $fetch(contactFormEndpoint as string, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: payload,
    })
    status.value = 'sent'
  }
  catch {
    status.value = 'error'
  }
}
</script>

<template>
  <form class="contact-form" @submit.prevent="submit">
    <h3 class="contact-form__title">Écrivez-nous</h3>

    <div class="contact-form__row">
      <label>
        <span>Nom et prénom *</span>
        <input v-model="form.name" type="text" name="name" autocomplete="name" required>
      </label>
      <label>
        <span>Établissement</span>
        <input v-model="form.organisation" type="text" name="organisation" autocomplete="organization">
      </label>
    </div>

    <div class="contact-form__row">
      <label>
        <span>E-mail *</span>
        <input v-model="form.email" type="email" name="email" autocomplete="email" required>
      </label>
      <label>
        <span>Téléphone</span>
        <input v-model="form.phone" type="tel" name="phone" autocomplete="tel">
      </label>
    </div>

    <label v-if="subjects?.length">
      <span>Objet</span>
      <select v-model="form.subject" name="subject">
        <option v-for="subject in subjects" :key="subject" :value="subject">{{ subject }}</option>
      </select>
    </label>

    <label>
      <span>Votre message *</span>
      <textarea v-model="form.message" name="message" rows="5" required />
    </label>

    <label class="visually-hidden" aria-hidden="true">
      Site web <input v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off">
    </label>

    <label class="contact-form__consent">
      <input v-model="form.consent" type="checkbox" required>
      <span>J'accepte que mes données soient utilisées pour être recontacté(e) au sujet de ma demande. *</span>
    </label>

    <button class="btn btn--primary" type="submit" :disabled="status === 'sending'">
      {{ status === 'sending' ? 'Envoi en cours…' : 'Envoyer ma demande' }}
      <BrandIcon name="arrow" />
    </button>

    <p v-if="status === 'sent'" class="contact-form__status" role="status">
      {{ contactFormEndpoint ? 'Merci ! Votre message a bien été envoyé, nous revenons vers vous rapidement.' : 'Votre client mail s’est ouvert avec votre message : il ne reste plus qu’à l’envoyer.' }}
    </p>
    <p v-if="status === 'error'" class="contact-form__status contact-form__status--error" role="alert">
      L'envoi a échoué. Vous pouvez nous écrire directement à <a :href="`mailto:${email}`">{{ email }}</a>.
    </p>
  </form>
</template>

<style scoped>
.contact-form {
  display: grid;
  gap: 1.1rem;
  padding: clamp(1.75rem, 3.5vw, 2.75rem);
  border-radius: var(--radius);
  background: #fff;
  color: var(--ink);
  box-shadow: 0 30px 80px -30px rgb(0 0 0 / 0.6);
}

.contact-form__title {
  margin-bottom: 0.4rem;
  font-size: 1.625rem;
  font-weight: 800;
  color: var(--brown);
}

.contact-form__row {
  display: grid;
  gap: 1.1rem;
}

@media (min-width: 560px) {
  .contact-form__row { grid-template-columns: 1fr 1fr; }
}

label {
  display: grid;
  gap: 0.4rem;
  font-size: 0.9375rem;
  font-weight: 600;
}

input:not([type='checkbox']),
select,
textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1.5px solid var(--line);
  border-radius: var(--radius-sm);
  background: #fdfcf7;
  font: inherit;
  font-weight: 400;
  color: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--gold);
  box-shadow: 0 0 0 4px rgb(239 193 0 / 0.25);
}

textarea { resize: vertical; }

.contact-form__consent {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  font-weight: 400;
  font-size: 0.875rem;
  color: var(--ink-muted);
}

.contact-form__consent input {
  flex: none;
  width: 18px;
  height: 18px;
  margin-top: 0.15rem;
  accent-color: var(--brown);
}

.contact-form .btn { justify-self: start; margin-top: 0.4rem; }
.contact-form .btn:disabled { opacity: 0.6; cursor: progress; }

.contact-form__status {
  padding: 0.9rem 1.1rem;
  border-radius: var(--radius-sm);
  background: #f3f8e8;
  color: #3d5a12;
  font-size: 0.9375rem;
}

.contact-form__status--error {
  background: #fdeeee;
  color: #8a1f1f;
}
</style>
