// short, medium, long could also have an object as their value
// that object could contain all the subcategories for a given category
// businesses.night.long.bars would point to ['wine bar', 'irish bar', 'champagne bar', etc]
module.exports = {
  morning: {
    short: ['breakfast', 'active life', 'coffee'],
    medium: [],
    long: []
  },
  afternoon: {
    short: [],
    medium: [],
    long: []
  },
  evening: {
    short: [],
    medium: [],
    long: []
  },
  night: {
    short: [],
    medium: [],
    long: ['bars', 'danceclubs', 'coffee']
  }
}