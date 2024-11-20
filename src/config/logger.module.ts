import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './winston.config';

@Module({
  imports: [
    WinstonModule.forRoot(winstonConfig), // Configura WinstonModule con tu configuración
  ],
  exports: [
    WinstonModule, // Exporta WinstonModule para que pueda ser utilizado en otros módulos
  ],
})
export class LoggerModule {}
