const fs = require('fs');
const path = require('path');

async function run() {
  const input = fs.readFileSync(path.join(__dirname, 'input-test.txt'), 'utf8').trim()
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
  for(let i=disk.length-1; i>=0; i--) {
    if (disk[i].id !== '.') {
      for(let j=0; j<disk.length; j++) {
        if(disk[j].id === '.' && disk[j].slots >= disk[i].slots) {
          let shiftingId = disk[i].id
          let shiftingSlots = disk[i].slots
          let difference = disk[j].slots - disk[i].slots
          disk[i].id = '.'

          let updatedDisk = disk.slice(0, j).concat({
            slots: shiftingSlots,
            id: shiftingId
          })
          if(difference > 0) {
            updatedDisk = updatedDisk.concat({
              slots: difference,
              id: '.'
            })
          }
          updatedDisk = updatedDisk.concat(disk.slice(j+1))
          disk = updatedDisk
          break
        }
      }
    }
  }

  // unify adjacent elements with id '.' and sum their slots
  for(let i=0; i<disk.length-1; i++) {
    if(disk[i].id === '.' && disk[i+1].id === '.') {
      disk[i].slots += disk[i+1].slots
      disk.splice(i+1, 1)
    }
  }

  return disk
}

// function diskToString(disk) {
//   let parsedDisk = []

//   for (let i = 0; i < disk.length; i++) {
//     for (let j = 0; j < disk[i].slots; j++) {
//       parsedDisk.push({
//         id: disk[i].value,
//         value: disk[i].value
//       })
//     }
//   }

//   return parsedDisk
// }

// function printDisk(disk) {
//   let diskString = ''
//   for (let i = 0; i < disk.length; i++) {
//     diskString += disk[i].value
//   }
//   console.log(diskString)
// }

async function resolveSecondChallenge(input) {
  let disk = alternativeInit(input)
  let defragDisk = alternativeDefrag(disk)
  let checksum = 0
  // printDisk(defragDisk)
  // let diskString = diskToString(defragDisk)

  // let checksum = calculateChecksum(diskString)


  console.log('The checksum is:', checksum)
}

run()
