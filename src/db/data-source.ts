import { DataSource, DataSourceOptions } from "typeorm";


export const dataSourceOptions: DataSourceOptions = {

    type: 'postgres',
    url: process.env.DATABASE_URL,
    //autoLoadEntities: true,
    //password:'ODT22qMO1aQOyHHbJc3lACezXwDIRQo4',
    synchronize: true,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;

