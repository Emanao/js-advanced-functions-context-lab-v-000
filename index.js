/* Your Code Here */
function createEmployeeRecord (employee){
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
function createEmployeeRecords(employees){
  return employees.map((employee)=>createEmployeeRecord(employee));
}

function createTimeInEvent(dateStamp){
  const [date, time] = dateStamp.split(" ");

  this.timeInEvents.push({
    type:"TimeIn",
    date: date,
    hour: parseInt(time)
  });
  return this;
}

function createTimeOutEvent(dateStamp){
  const [date, time] = dateStamp.split(" ");

  this.timeOutEvents.push({
    type:"TimeOut",
    date: date,
    hour: parseInt(time)
  });
  return this;

}

function hoursWorkedOnDate(date){
  const timeIn = this.timeInEvents.find(timeInEvent=>timeInEvent.date ===date).hour;
  const timeOut = this.timeOutEvents.find(timeOutEvent=>timeOutEvent.date ===date).hour;
  return (timeOut-timeIn)/100;
}

function wagesEarnedOnDate(date){
  return hoursWorkedOnDate.call(this,date)*this.payPerHour;
}

// /*
//  We're giving you this function. Take a look at it, you might see some usage
//  that's new and different. That's because we're avoiding a well-known, but
//  sneaky bug that we'll cover in the next few lessons!
//
//  As a result, the lessons for this function will pass *and* it will be available
//  for you to use if you need it!
//  */

//
// function allWagesFor(employee){
//   const timeInEvents = employee.timeInEvents;
//   const  allWagesFor= timeInEvents.map(timeEvent=>wagesEarnedOnDate(employee,timeEvent.date)).reduce((accu,wage)=>accu +=wage);
//   return allWagesFor;
// }

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(employees){
  return employees.map((employee) => allWagesFor(employee)).reduce((accu,wage)=>accu += wage);
}


function findEmployeeByFirstName(employees, firstName){
  return employees.find(employee=>employee.firstName === firstName);
}
