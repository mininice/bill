//var BillList = DB.model.BillList;

/**
 * 创建客栈
 */
export default async function (params) {

  try {
    const result = BillList.findAll();
    return result;
  } catch (e) {
    // nothing to do (now)
  }

  return null;
}
