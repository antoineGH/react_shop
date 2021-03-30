export default function getDescription(description) {
	if (description !== undefined) {
		const arr = description.split('Detailed Features')
		return arr
	}
}
