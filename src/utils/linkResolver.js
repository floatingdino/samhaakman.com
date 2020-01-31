export const linkResolver = doc => {
  if (doc.type === "portfo") {
    return `/portfolio/${doc.uid}`
  }

  return `/${doc.uid}`
}
