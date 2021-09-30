import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../../utils/dbConfig';

class CityMaster extends Model {
  public city_id!: number;
  public city_name!: string;
  public state_id!: number;
  public country_id!: number;
  public is_user_defined!: number;
}

CityMaster.init(
  {
    city_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    city_name: {
      type: new DataTypes.STRING(),
      allowNull: false
    },
    state_id: {
      type: new DataTypes.BIGINT().UNSIGNED,
      defaultValue: 1
    },
    country_id: {
      type: new DataTypes.BIGINT().UNSIGNED,
      defaultValue: 1
    },
    is_user_defined: {
      type: new DataTypes.TINYINT(),
      defaultValue: 0
    }
  },
  {
    sequelize,
    tableName: 'city_master',
    timestamps: false
  }
);

export default CityMaster;
