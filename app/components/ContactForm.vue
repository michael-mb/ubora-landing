<script setup lang="ts">
const props = defineProps<{ subjects?: string[], email?: string }>()

const { t, localePath } = useLocale()

const form = reactive({
  name: '',
  organisation: '',
  email: '',
  phone: '',
  subject: props.subjects?.[0] ?? '',
  message: '',
  consent: false,
  hp_check: '',
})

const status = ref<'idle' | 'sending' | 'sent' | 'mail-opened' | 'error'>('idle')

function openMailClient() {
  const body = [
    form.message,
    '',
    `${t.value.form.name}: ${form.name}`,
    form.organisation && `${t.value.form.organisation}: ${form.organisation}`,
    `${t.value.form.email}: ${form.email}`,
    form.phone && `${t.value.form.phone}: ${form.phone}`,
  ].filter(line => line !== '').join('\n')
  window.location.href = `mailto:${props.email ?? ''}?subject=${encodeURIComponent(`${t.value.form.mailSubjectPrefix} ${form.subject}`)}&body=${encodeURIComponent(body)}`
  status.value = 'mail-opened'
}

async function submit() {
  status.value = 'sending'
  try {
    await $fetch('/api/contact', { method: 'POST', body: form })
    status.value = 'sent'
  }
  catch (error: any) {
    if (error?.statusCode === 503) openMailClient()
    else status.value = 'error'
  }
}
</script>

<template>
  <form class="contact-form" @submit.prevent="submit">
    <h3 class="contact-form__title">{{ t.form.title }}</h3>

    <div class="contact-form__row">
      <label>
        <span>{{ t.form.name }} *</span>
        <input v-model="form.name" type="text" name="name" autocomplete="name" required>
      </label>
      <label>
        <span>{{ t.form.organisation }}</span>
        <input v-model="form.organisation" type="text" name="organisation" autocomplete="organization">
      </label>
    </div>

    <div class="contact-form__row">
      <label>
        <span>{{ t.form.email }} *</span>
        <input v-model="form.email" type="email" name="email" autocomplete="email" required>
      </label>
      <label>
        <span>{{ t.form.phone }}</span>
        <input v-model="form.phone" type="tel" name="phone" autocomplete="tel">
      </label>
    </div>

    <label v-if="subjects?.length">
      <span>{{ t.form.subject }}</span>
      <select v-model="form.subject" name="subject">
        <option v-for="subject in subjects" :key="subject" :value="subject">{{ subject }}</option>
      </select>
    </label>

    <label>
      <span>{{ t.form.message }} *</span>
      <textarea v-model="form.message" name="message" rows="5" required />
    </label>

    <label class="visually-hidden" aria-hidden="true">
      {{ t.form.honeypot }} <input v-model="form.hp_check" type="text" name="hp_check" tabindex="-1" autocomplete="off" data-1p-ignore data-lpignore="true">
    </label>

    <label class="contact-form__consent">
      <input v-model="form.consent" type="checkbox" required>
      <span>
        {{ t.form.consentBefore }}
        <NuxtLink :to="localePath('/politique-de-confidentialite')" target="_blank">{{ t.form.consentLink }}</NuxtLink>. *
      </span>
    </label>

    <button class="btn btn--primary" type="submit" :disabled="status === 'sending'">
      {{ status === 'sending' ? t.form.sending : t.form.submit }}
      <BrandIcon name="arrow" />
    </button>

    <p v-if="status === 'sent' || status === 'mail-opened'" class="contact-form__status" role="status">
      {{ status === 'sent' ? t.form.sent : t.form.mailOpened }}
    </p>
    <p v-if="status === 'error'" class="contact-form__status contact-form__status--error" role="alert">
      {{ t.form.failed }} <a :href="`mailto:${email}`">{{ email }}</a>.
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

.contact-form__consent a { color: var(--brown); font-weight: 600; }

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
