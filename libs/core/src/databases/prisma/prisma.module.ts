import { DynamicModule, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
// lazy import
import { PrismockClient } from 'prismock/build/main/lib/client'

@Module({})
export class PrismaModule {
  static register(): DynamicModule {
    if (process.env.ENVIRONMENT && process.env.ENVIRONMENT === 'test') {
      return {
        module: PrismaModule,
        providers: [
          {
            provide: PrismaService,
            useValue: new PrismockClient()
          }
        ],
        exports: [PrismaService]
      }
    } else {
      return {
        module: PrismaModule,
        providers: [PrismaService],
        exports: [PrismaService]
      }
    }
  }
}
