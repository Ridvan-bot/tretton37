//  The asyncForEach function allows performing asynchronous operations on each element of an array sequentially, collecting the results into a new array.

export const asyncForEach = async function <T>(
    array: T[] | any[],
    callback: (elm: T, index: number, array: T[]) => any
  ): Promise<any[]> {
    let element: any[] = [];
    for (let index = 0; index < array.length; index++) {
      element.push(await callback(array[index], index, array));
    }
    return element;
  };