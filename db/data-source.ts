import { DataSource, DataSourceOptions } from "typeorm";

export const datasourceOption: DataSourceOptions = {
    type: 'sqlite',
    database: "db.sqlite",
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js']
};

const dataSource = new DataSource(datasourceOption);
export default dataSource;