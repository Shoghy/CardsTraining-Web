export function RandomString(length: number) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length - 1;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(RandomInt(0, charactersLength));
    counter += 1;
  }
  return result;
}

export function RandomInt(minInclusive:number, maxInclusive:number){
  return Math.floor(
    Math.random() * (maxInclusive - minInclusive + 1)
  )  + minInclusive;
}

export function RandomFloat(minInclusive:number, maxInclusive:number){
  return Math.random() * (maxInclusive - minInclusive) + minInclusive;
}
