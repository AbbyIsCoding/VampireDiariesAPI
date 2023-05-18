import { Controller, Post, Patch, Delete, Body, Get, Param } from '@nestjs/common';
import { speciesService } from './spec.service';

@Controller('species')
export class speciesController {
    constructor(private readonly specService: speciesService) { }
    
    @Get()
    async getAllSpecies() {
        const specs = await this.specService.getSpecies(); //what is this.charsService? 
        return specs;
        
    }

    @Post()
    async addSpecies(
        @Body('name') speciesName: string, 
        @Body('status') speciesStatus: string,
        @Body ('description') speciesDescription: string, 
        @Body('picture') speciesPicture: string,
    )
         {
        const generatedId = await this.specService.addSpecies(speciesName, speciesStatus, speciesDescription, speciesPicture);
        return { id: generatedId };

    }
    

    @Get(':id')
    async getSpeciesById(@Param('id') speciesId: string,) {
        const spec  = await this.specService.getSpeciesById(speciesId);
        return spec;
    }

    @Patch(':id')
    async updateCharById(
        @Param('id') speciesId: string,
        @Body('name') speciesName: string, 
        @Body('staus') speciesStatus: string,
        @Body ('description') speciesDescription: string,
        @Body('picture') speciesPicture: string,
    ) {
        
        await this.specService.updateSpeciesById(speciesId, speciesName, speciesStatus, speciesDescription, speciesPicture);
        return null;
    }

    @Delete(':id')
    async deleteSpeciesById(@Param('id') speciesId: string,) {
        await this.specService.deleteSpeciesById(speciesId);
        return null;
    }
   
}
