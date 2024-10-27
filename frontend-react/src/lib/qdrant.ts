export type VectorDocumentMeta = {
	id?: string
	imageUrl?: string
	keywords?: string[]
	probability?: number
	summary?: string
	topic?: string
}

export async function storeDocument(document: VectorDocumentMeta) {
	try {
		const response = await fetch('/api/vector-store', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(document),
		})

		if (!response.ok) {
			throw new Error('Failed to store document')
		}

		const data = await response.json()
		console.log('Stored document in Qdrant with ID:', data.id)
		return data.id

	} catch (error) {
		console.error('Error storing document:', error)
		throw error
	}
}
