import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../../utils/dbConfig';

class CountryMaster extends Model {
  public country_id!: number;
  public country_name!: string;
  public code!: string;
  public dial_code!: string;
  public is_active!: number;
}

CountryMaster.init(
  {
    country_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    country_name: {
      type: new DataTypes.STRING(),
      allowNull: false
    },
    code: {
      type: new DataTypes.STRING()
    },
    dial_code: {
      type: new DataTypes.STRING()
    },
    is_active: {
      type: new DataTypes.TINYINT(),
      defaultValue: 1
    }
  },
  {
    sequelize,
    tableName: 'country_master',
    timestamps: false
  }
);

export default CountryMaster;
