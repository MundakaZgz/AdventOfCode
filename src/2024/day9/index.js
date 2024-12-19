const fs = require('fs');
const path = require('path');

async function run() {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim()
  await resolveFirstChallenge(input)
  await resolveSecondChallenge(input)
}

async function resolveFirstChallenge(input) {
  let disk = initDisk(input)
  let defragDisk = defrag(disk)
  let checksum = calculateChecksum(defragDisk)
  console.log('The checksum is:', checksum)
}

function initDisk(input) {
  let writtingData = true
  let disk = []
  let fileId = 0
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < parseInt(input[i]); j++) {
      if (writtingData) {
        disk.push({
          id: fileId,
          value: input[i]
        })
      } else {
        disk.push({
          id: 0,
          value: '.'
        })
      }
    }
    if (writtingData) {
      fileId++
    }
    writtingData = !writtingData;
  }
  return disk
}

function defrag(disk) {
  for(let i=disk.length-1; i>=0; i--) {
    if (disk[i].value !== '.') {
      for(let j=0; j<i; j++) {
        if (disk[j].value === '.') {
          disk[j].value = disk[i].value
          disk[j].id = disk[i].id
          disk[i].value = '.'
          disk[i].id = '.'
          break;
        }
      }
    }
  }
  return disk
}

function calculateChecksum(disk) {
  return disk
  .map((el, index) => (el.value !== '.' ? index * el.id : 0))
  .reduce((sum, value) => sum + value, 0)
}

function calculateAlternativeChecksum(disk) {
  let checksum = 0
  let position = 0
  
  for (let i = 0; i < disk.length; i++) {
    for (let j = 0; j < disk[i].slots; j++) {
      const itemId = disk[i].id;
      if (itemId !== '.') {
        checksum += position * itemId
      }
      position++
    }
  }
  
  return checksum
}

function alternativeInit(input) {
  let disk = []
  let id = 0
  for (let i = 0; i < input.length; i++) {
    let idValue = '.'
    if (i % 2 === 0) {
      idValue = id
      id++
    }
    disk.push({
      slots: parseInt(input[i]),
      id: idValue
    })
  }
  return disk
}

function alternativeDefrag(disk) {
  for (let valueIndex = disk.length - 1; valueIndex >= 0; valueIndex--) {
    if (disk[valueIndex].id !== '.') {
      for (let gapIndex = 0; gapIndex < valueIndex; gapIndex++) {
        if (disk[gapIndex].id === '.' && disk[gapIndex].slots >= disk[valueIndex].slots) {
          let shiftingId = disk[valueIndex].id;
          let shiftingSlots = disk[valueIndex].slots;
          let difference = disk[gapIndex].slots - disk[valueIndex].slots;
          
          disk[gapIndex].id = shiftingId;
          disk[gapIndex].slots = shiftingSlots;
          
          if (difference > 0) {
            if (gapIndex + 1 < disk.length && disk[gapIndex + 1].id === '.') {
              disk[gapIndex + 1].slots += difference;
            } else {
              disk.splice(gapIndex + 1, 0, {
                slots: difference,
                id: '.'
              });
              valueIndex++
            }
          }
          disk[valueIndex].id = '.';
          break;
        }
      }
    }
  }
  
  return disk
}

// function diskToString(disk) {
//   let diskString = ''
//   for (let i = 0; i < disk.length; i++) {
//     for (let j = 0; j < disk[i].slots; j++) {
//       diskString += disk[i].id
//     }
//   }
//   return diskString
// }

// function printDisk(disk) {
//   console.log(diskToString(disk))
// }

async function resolveSecondChallenge(input) {
  let disk = alternativeInit(input)
  let defragDisk = alternativeDefrag(disk)
  let checksum = calculateAlternativeChecksum(defragDisk)
  console.log('The checksum is:', checksum)
}

run()
