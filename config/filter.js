import { Types } from "mongoose";
import moment from "moment";
export const formatFilter = async (data) => {
  let queries = [];
  for await (let query of data) {
    switch (query["type"]) {

      case "TEXT":
        queries.push({ [query["column_id"]]: { $regex: `${query.value}`, $options: "i" } });
      break;

      case "CONTENT":
        queries.push({ [query["column_id"]]: query.value });
      break;

      case "BOOLEAN":
        queries.push({ [query["column_id"]]: query.value ? true : false });
      break;

      case "ARRAY":
        queries.push({ [query["column_id"]]: { $in: query.value.includes("[") ? JSON.parse(query.value) : query.value}})
        break;

      case "DATE":
        
        queries.push({
          [query["column_id"]]: {
            $gte: new Date(moment(new Date(query.value[0])).format("YYYY-MM-DD")),
            $lt: query.value[1]? new Date(moment(new Date(query.value[1])).add(1, "days").format("YYYY-MM-DD")) :  new Date(moment(new Date(query.value[0])).add(1, "days").format("YYYY-MM-DD")),
          },
        }); 
      break;

      case "NOT_EXISTS":
        queries.push({
          [query["column_id"]]: {$exists:false},
        });
      break;

      case "EXISTS":
        queries.push({
          [query["column_id"]]: {$exists:true},
        });
      break;

      case "NUMBER":
        queries.push({ [query["column_id"]]: parseInt(query.value) });
        break;

      default:
        if (Types.ObjectId.isValid(query.value)) {
          queries.push({ [query["column_id"]]: Types.ObjectId(query.value) });
        } else {
          queries.push({ [query["column_id"]]: query.value });
        }
        break;
    }
  }
  return queries ?? [];
};

export const formatSorting = async (data) => {
  try {
    let sorting = {};
    for await (let sort of Object.keys(data)) {
      sorting[sort] = data[sort].toUpperCase() === "ASC" ? 1 : -1;
    }
    return sorting;
  } catch (error) {
    console.log("error while formatting sorting", error);
    return {createdAt:-1};
  }
}
