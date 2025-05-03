export const truncateDescription = (desc: string | null) => {
  if (!desc) return '';

  if (desc.length > 15) {
    return desc.slice(0, 15) + '...';  // Remove join() since we're working with a string
  }

  return desc;
}
