export const linkResolver = doc => {
  if (doc.type === "portfolio") {
    return `/portfolio/${doc.uid}`
  }

  return `/${doc.uid}`
}
