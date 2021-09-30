import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../../utils/dbConfig';

class StateMaster extends Model {
  public state_id!: number;
  public state_name!: string;
  public country_id!: number;
}

StateMaster.init(
  {
    state_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    state_name: {
      type: new DataTypes.STRING(),
      allowNull: false
    },
    country_id: {
      type: new DataTypes.BIGINT().UNSIGNED,
      defaultValue: 1
    }
  },
  {
    sequelize,
    tableName: 'state_master',
    timestamps: false
  }
);

export default StateMaster;
