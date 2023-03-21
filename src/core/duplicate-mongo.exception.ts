import { HttpException, HttpStatus } from "@nestjs/common";

export class DuplicateMongoException extends HttpException {
    private test: string;

    constructor(e: any = null) {
        if(e != null && e.code === 11000 && e.errmsg.includes('index: ')){
            const errorParsed = e.errmsg.split('index: ')[1].split(' dup key: ')[1].replace('{', '').replace('}', '').replaceAll(' ','');
            super(`${errorParsed} existe déjà`, HttpStatus.BAD_REQUEST);
        }else{
            super('', HttpStatus.BAD_REQUEST);
        }
        
    }
  }
  