
type descriptionType = {
    description: string
}
const AboutThisPlace = ({description}:descriptionType) => {
  return (
    <div className="py-6 border-b border-gray-200">
    <h2 className="text-xl font-semibold mb-4">About this place</h2>
    <p className="text-gray-600">{description}</p>
  </div>
  )
}

export default AboutThisPlace
