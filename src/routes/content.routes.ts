import { Router } from 'express';
import { getRepository } from 'typeorm';
import Content from '../entity/Content';
import { validate } from "class-validator"

const contentRouter = Router();

contentRouter.post('/', async (request, response) => {
  try {
    const repo = getRepository(Content);

    const {description, linkContent } = request.body;
    const content = repo.create({
      description,
      linkContent
    })

    const errors = await validate(content)
    
    if(errors.length == 0){
      const res = await repo.save(content)
      return response.status(201).json(res)
    }
    return response.status(400).json(errors.map(v => v.constraints))
    
  } catch (err) {
    console.log('err.message :>> ', err.message);
    return response.status(400).send();
  }
});

contentRouter.get('/', async (request, response) => {
  response.json(await getRepository(Content).find());
});

export default contentRouter;
