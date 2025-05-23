import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig();

const config = {
    type: 'postgres',
    host: `${process.env.DATABASE_HOST}`,
    port: `${process.env.DATABASE_PORT}`,
    username: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    entities: ["dist/**/entities/**/*{.ts,.js}"],
    migrations: ["dist/migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: false,
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);