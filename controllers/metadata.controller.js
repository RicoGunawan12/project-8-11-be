import { getMetadataService } from "../services/metadata.service.js"

export const getMetadata = async (req,res) =>{
  const { slug } = req.params

  try {
    const metadata = await getMetadataService(slug)

    return res.status(200).json(metadata);
  } catch (error) {
    return res.status(404).send(error.message)
  }
}