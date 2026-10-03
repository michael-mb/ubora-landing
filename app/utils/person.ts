export function initialsOf(name?: string): string {
  return String(name ?? '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0]?.toUpperCase())
    .join('')
}

export function personPhoto(photo: { filename?: string } | undefined, width: number, height = width) {
  const url = photo?.filename
  if (!url) return undefined
  if (!url.includes('storyblok.com') || url.endsWith('.svg')) return { src: url, srcset: undefined }
  const size = (scale: number) => `${url}/m/${width * scale}x${height * scale}/smart`
  return { src: size(1), srcset: `${size(1)} 1x, ${size(2)} 2x` }
}
