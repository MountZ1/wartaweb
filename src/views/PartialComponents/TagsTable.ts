import { truncateDescription } from "../../library/truncateDescription"

interface Tags {
  tags: {
    id: number,
    name: string,
    slug: string,
    description: string | null
  }[],
  hasMore: boolean,
  nextOffset?: number,
}

export const TagTable = (props: Tags): string => {
  const row = props.tags.map((tag) => `
    <tr class="divide-y divide-gray-200" id="tag-${tag.id}" data-tag-id="${tag.id}">
      <td class="px-6 py-2 whitespace-nowrap text-sm">${tag.name}</td>
      <td class="px-6 py-2 whitespace-nowrap text-sm">${tag.slug}</td>
      <td class="px-6 py-2 whitespace-nowrap text-sm">${truncateDescription(tag.description)}</td>
      <td class="px-6 py-2 whitespace-nowrap text-sm">
        <button class="text-blue-500 hover:underline mr-2" onclick="edit('${encodeURIComponent(JSON.stringify(tag))}')">Edit</button>
        <button class="text-red-500 hover:underline" onclick="deleteTag('${tag.name}')">Delete</button>
      </td>
    </tr>
  `).join('');

  // Check if initial load with no data
  if (props.tags.length === 0 && props.hasMore) {
    return `<tr><td class="py-2 text-sm text-center from-neutral-100" colspan="4">No data tags found</td></tr>`;
  }

  // For subsequent loads, only add the load-more row if there are more items
  return `
    ${row}
    ${props.hasMore ? `
      <tr id="load-more-trigger" 
          hx-get="/auth/gettags?offset=${props.nextOffset}" 
          hx-trigger="revealed" 
          hx-target="#load-more-trigger" 
          hx-swap="outerHTML">
        <td colspan="4" class="text-center p-4">
          <div class="flex justify-center">
            <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </td>
      </tr>
    ` : ``}
  `;
}
