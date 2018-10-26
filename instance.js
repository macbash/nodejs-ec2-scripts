var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
var ec2 = new AWS.EC2();
var instancesList = '';
var params = {
  Filters: [
   {
    Name: 'tag:Role',
    Values: [
            'aws-1'
    ],
   },
  ]
};
ec2.describeInstances(params, function(err, data) {
  if (err) return console.log(err, err.stack);

  for (var i in data.Reservations){
    var ins = data.Reservations[i].Instances[0]
    instancesList+= '  id: ' +ins.InstanceId + '  Status: ' + ins.State.Name +'\n'; 
    params = {Resources: [ins.InstanceId], Tags: [
      {
         Key: 'Name',
         Value: 'Testinstance1'
      },
      {
         Key: 'Instance-ID',
         Value: ins.InstanceId
      }

   ]}
   ec2.createTags(params, function(err) {
      console.log('Tagging instance', err ? 'failure' : 'success')
   })
  }
  console.log(instancesList);
})
