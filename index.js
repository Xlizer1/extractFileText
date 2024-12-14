const { open, writeFile } = require("node:fs/promises");

(async () => {
  const getItemsArr = async () => {
    let arr = [];
    let sqlString = "";
    const file = await open("items.txt");
    let i = 1;

    for await (const line of file.readLines()) {
      const pairs = line?.split(": ");
      const obj = {
        id: i,
        paint_index: JSON.parse(pairs[0]),
        name: pairs[1],
      };
      if (i === 1) {
        sqlString += `(${obj.paint_index}, "${obj.name}")`;
      } else {
        sqlString += `, (${obj.paint_index}, "${obj.name}")`;
      }
      arr.push(obj);
      i++;
    }

    await file.close();
    return [arr, sqlString];
  };

  const itemsArray = await getItemsArr();
  await writeFile(
    "/Users/musta/work/textreader/items.json",
    JSON.stringify(itemsArray[0])
  );
  await writeFile(
    "/Users/musta/work/textreader/sqlString.txt",
    JSON.stringify(itemsArray[1])
  );
})();
