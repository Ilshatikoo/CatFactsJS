import fs from 'fs/promises';

const DEFAULT_LIMIT = 10;

const getBreeds = async (req, res) => {
  const DEFAULT_PAGE = 1;

  const limit = parseInt(req.query.limit) || DEFAULT_LIMIT;
  const page = parseInt(req.query.page) || DEFAULT_PAGE;

  try {
    const breedsData = await fs.readFile('./src/data/breeds.json', 'utf-8');
    const breeds = JSON.parse(breedsData).breeds;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const response = {
      breeds: breeds.slice(startIndex, endIndex),
      totalPages: Math.ceil(breeds.length / limit),
      currentPage: page
    };

    if (response.breeds.length === 0) {
      res.status(404).json({ error: 'No breeds found' });
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getBreeds };