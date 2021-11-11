import { Router } from 'express';
import { getRepository } from 'typeorm';
import Student from '../entity/Student';
import { validate } from "class-validator"

const studentRouter = Router();

studentRouter.post('/', async (request, response) => {
  try {
    const repo = getRepository(Student);
    const { name, key, email } = request.body;
    const student = repo.create({
      name,
      key,
      email

    })

    const errors = await validate(student)
    
    if(errors.length == 0){
      const res = await repo.save(student)
      return response.status(201).json(res)
    }
    return response.status(400).json(errors.map(v => v.constraints))


  } catch (err) {
    console.log('err.message :>> ', err.message);
    return response.status(400).send();
  }
});

studentRouter.get('/', async (request, response) => {
  response.json(await getRepository(Student).find());
});

export default studentRouter;
