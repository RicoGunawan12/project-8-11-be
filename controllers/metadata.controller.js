import { deleteMetadataService, getAllMetadataService, getMetadataService, insertMetadataService, updateMetadataService } from "../services/metadata.service.js"

export const getAllMetadata = async (req, res) =>  {
  try {
    const metadatas = await getAllMetadataService();

    return res.status(200).json(metadatas);
  } catch (error) {
    console.error(error.message);

    return res.status(500).send("Internal server error, please inquire this issue to developer");
  }
}

export const getMetadata = async (req,res) =>{
  const { slug } = req.params

  try {
    const metadata = await getMetadataService(slug)

    return res.status(200).json(metadata);
  } catch (error) {
    return res.status(404).send(error.message)
  }
}

export const insertMetadata = async (req, res) => {
  console.log(req.body);
  const {
    slug,
    title,
    description,
    keywords
  } = req.body;

  try {
    const metadata = insertMetadataService({
      slug, title, description, keywords
    });
    
    return res.status(201).json({
      message: "Metadata created successfully",
      metadata
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export const updateMetadata = async (req, res) => {
  const slug = req.params.slug;
  const {
    title,
    description,
    keywords
  } = req.body;

  try {
    const metadata = await updateMetadataService(slug, {
      title, description, keywords
    });

    return res.status(200).json({
      message: "Metadata updated successfully",
      metadata
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error, please inquire this issue to developer");
  }
}

export const deleteMetadata = async (req, res) => {
  const slug = req.params.slug;

  try {
    const result = await deleteMetadataService(slug);

    return res.status(200).json({
      message: "Metadata deleted successfully"
    })
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error, please inquire this issue to developer");
  }
}