const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function singleLine(value: unknown, max: number) {
  return String(value ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max)
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Record<string, unknown>>(event)
  if (body?.website) return { ok: true }

  const name = singleLine(body?.name, 200)
  const organisation = singleLine(body?.organisation, 200)
  const email = singleLine(body?.email, 200)
  const phone = singleLine(body?.phone, 50)
  const subject = singleLine(body?.subject, 150)
  const message = String(body?.message ?? '').trim().slice(0, 5000)

  if (!name || !message || !EMAIL_PATTERN.test(email) || body?.consent !== true) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid form data' })
  }

  const { brevoApiKey, contactTo, contactFrom } = useRuntimeConfig(event)
  if (!brevoApiKey) {
    throw createError({ statusCode: 503, statusMessage: 'Contact form is not configured' })
  }

  const textContent = [
    `Nouvelle demande depuis le site web`,
    '',
    `Nom : ${name}`,
    organisation && `Établissement : ${organisation}`,
    `E-mail : ${email}`,
    phone && `Téléphone : ${phone}`,
    subject && `Objet : ${subject}`,
    '',
    message,
  ].filter(line => line !== '').join('\n')

  try {
    await $fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': brevoApiKey, 'accept': 'application/json' },
      body: {
        sender: { name: 'Site UBORA CAPITAL PARTNER', email: contactFrom || contactTo },
        to: [{ email: contactTo }],
        replyTo: { email, name },
        subject: `[Site web] ${subject || 'Nouvelle demande'} — ${name}`,
        textContent,
      },
    })
  }
  catch (error) {
    console.error('Brevo send failed', error)
    throw createError({ statusCode: 502, statusMessage: 'Email could not be sent' })
  }

  return { ok: true }
})
