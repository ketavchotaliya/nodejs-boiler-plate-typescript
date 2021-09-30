import { QueryTypes } from 'sequelize';
import { getObjectKeys } from './helper';
import { logger } from './logger';
import sequelize from './dbConfig';

class DBFunctions {
  public async dbQuery(
    dbQuery: string,
    paramsArr: any = [],
    paramKey: string = '',
    transaction: any = null,
    queryType: string = ''
  ) {
    try {
      if (typeof dbQuery === 'undefined' || dbQuery === null) {
        throw new Error('dbQuery could not be empty');
      } else {
        let results: any = null;
        const queryArguments: any = {};

        if (paramsArr.length > 0) {
          queryArguments.replacements = paramsArr;
          if (paramKey !== '') {
            queryArguments.replacements = { [paramKey]: paramsArr };
          }
        }

        if (transaction !== null) {
          queryArguments.transaction = transaction;
        }

        if (queryType.toLowerCase() === 'select') {
          queryArguments.type = QueryTypes.SELECT;
        } else if (queryType.toLowerCase() === 'insert') {
          queryArguments.type = QueryTypes.INSERT;
        } else if (queryType.toLowerCase() === 'update') {
          queryArguments.type = QueryTypes.UPDATE;
        } else if (queryType.toLowerCase() === 'delete') {
          queryArguments.type = QueryTypes.DELETE;
        }

        results = await sequelize.query(dbQuery, queryArguments);

        if (transaction !== null) {
          queryArguments.transaction = 'transaction';
        }

        logger.debug(__filename, 'dbQuery', '', 'dbQuery==========>', dbQuery);
        logger.debug(__filename, 'dbQuery', '', 'queryArguments========>', queryArguments);

        return results;
      }
    } catch (e) {
      throw e;
    }
  }

  public async dbSearch(criteria: any, criteriaOperator: any, tableAlias: any) {
    try {
      const tableAliasKeys: any = getObjectKeys(tableAlias);
      criteriaOperator = criteriaOperator || 'AND';
      let colName: any;
      let sqlQuery: any = '';
      const criteriaArr: any = criteria || [];
      let isKeyMismatch: boolean = false;

      if (criteriaArr.length <= 0) {
        throw new Error('search criteria is missing!');
      }

      for (let i: number = 0; i < criteriaArr.length; i++) {
        const properties: any = getObjectKeys(criteriaArr[i]);
        if (!properties.includes('column') || !properties.includes('operator') || !properties.includes('values')) {
          isKeyMismatch = true;
          break;
        }
      }

      if (isKeyMismatch === false) {
        for (let i: number = 0; i < criteriaArr.length; i++) {
          if (!tableAliasKeys.includes(criteriaArr[i].column)) {
            isKeyMismatch = true;
            break;
          } else {
            // find original column name from table alias object
            colName = tableAlias[criteriaArr[i].column];
            // prepare sql statement
            sqlQuery += await this.operatorEnum(criteriaArr[i].operator, colName, criteriaArr[i].values[0]);

            if (i < criteriaArr.length - 1) {
              sqlQuery += await this.criteriaOperatorEnum(criteriaOperator);
            }
          }
        }
      }

      if (isKeyMismatch === true) {
        logger.error(__filename, 'dbSearch', '', 'Key mismatch in criteria array!', '');
        throw new Error('Key mismatch in criteria array!');
      }

      return sqlQuery;
    } catch (e) {
      logger.error(__filename, 'dbSearch', '', 'Error in dbSearch function : ', JSON.stringify(e.stack));
      throw e;
    }
  }

  private async operatorEnum(operator: any, colName: any, value: any) {
    try {
      let lastChar: any;
      let valueData: any = value;
      operator = operator.toLowerCase();
      switch (operator) {
        case 'like':
          return ' ' + colName + " LIKE '%" + valueData + "%' ";
        case 'notlike':
        case '!like':
          return ' ' + colName + " NOT LIKE '%" + valueData + "%' ";
        case 'equals':
        case '=':
          return ' ' + colName + '= "' + valueData + '" ';
        case 'notequals':
        case '!=':
          return ' ' + colName + '!= "' + valueData + '" ';
        case 'null':
          return ' ' + colName + ' IS NULL';
        case 'notnull':
        case '!null':
          return ' ' + colName + ' IS NOT NULL';
        case 'in':
          if (typeof valueData === 'string') {
            valueData = valueData.trim();
            lastChar = valueData[valueData.length - 1];
            // remove extra comma from string
            if (lastChar === ',') {
              valueData = valueData.slice(0, -1);
            }
          }
          return ' ' + colName + ' IN (' + valueData + ')';
        case 'notin':
        case '!in':
          if (typeof valueData === 'string') {
            valueData = valueData.trim();
            lastChar = valueData[valueData.length - 1];
            // remove extra comma from string
            if (lastChar === ',') {
              valueData = valueData.slice(0, -1);
            }
          }
          return ' ' + colName + ' NOT IN (' + valueData + ')';
        case 'true':
          return ' ' + colName + ' = ' + true;
        case 'false':
          return ' ' + colName + ' = ' + false;
        case 'greaterthan':
        case '>':
          return ' ' + colName + ' >  "' + valueData + '"';
        case 'lessthan':
        case '<':
          return ' ' + colName + ' <  "' + valueData + '"';
        case 'greaterthanorequal':
        case '>=':
          return ' ' + colName + ' >=  "' + valueData + '"';
        case 'lessthanorequal':
        case '<=':
          return ' ' + colName + ' <=  "' + value + '"';
        default:
          throw new Error('Invalid Operator!');
      }
    } catch (e) {
      logger.error(__filename, 'operatorEnum', '', 'Error in operatorEnum function:', JSON.stringify(e.stack));
      throw e;
    }
  }

  private async criteriaOperatorEnum(operator: string) {
    try {
      operator = operator.toLowerCase();
      switch (operator) {
        case 'and':
          return ' AND ';
        case 'or':
          return ' OR ';
        default:
          throw new Error('Invalid Criteria Operator!');
      }
    } catch (e) {
      logger.error(
        __filename,
        'criteriaOperatorEnum',
        '',
        'Error in criteriaOperatorEnum function:',
        JSON.stringify(e.stack)
      );
      throw e;
    }
  }
}

export default new DBFunctions();
