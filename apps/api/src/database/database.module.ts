import { Module, Global } from '@nestjs/common';
import { createPool, Pool } from 'mysql2/promise';

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (): Promise<Pool> => {
        return createPool({
          host: 'localhost',
          port: 3307,
          user: 'root',
          password: '123456',
          database: 'admin',
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
          namedPlaceholders: true,
        });
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}
