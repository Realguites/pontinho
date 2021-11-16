import { Router } from 'express';
import { getRepository } from 'typeorm';
import Lesson from '../entity/Lesson';
import { validate } from "class-validator"

const lessonRouter = Router();

lessonRouter.post('/', async (request, response) => {
  try {
    const repo = getRepository(Lesson);

    const {description } = request.body;
    const lesson = repo.create({
      description
    })

    const errors = await validate(lesson)
    
    if(errors.length == 0){
      const res = await repo.save(lesson)
      return response.status(201).json(res)
    }
    return response.status(400).json(errors.map(v => v.constraints))
    
  } catch (err) {
    console.log('err.message :>> ', err.message);
    return response.status(400).send();
  }
});

lessonRouter.get('/', async (request, response) => {
  response.json(await getRepository(Lesson).find());
});

export default lessonRouter;
