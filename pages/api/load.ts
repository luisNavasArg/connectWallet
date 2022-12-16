// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

type Data = {
  status: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.body.data);
  let dataNew=JSON.stringify(req.body.data);
  let ruta = './data/survey.json'
  let data=`{
    "title":"Survey",
   "image":"todos.png",
   "data": ${dataNew}}`
   
  fs.writeFileSync(ruta,data)
  let status:string="Ok"
  res.status(200).json({ status: status})
}

