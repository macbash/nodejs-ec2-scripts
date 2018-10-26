var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
var ec2 = new AWS.EC2();
var instancesList = '';
var params = {
    Filters: [{
        Name: 'tag:Role',
        Values: [
            'aws-1'
        ],
    }, ]
};
ec2.describeInstances(params, function(err, data) {
    if (err) return console.log(err, err.stack);

    for (var i in data.Reservations) {
        var ins = data.Reservations[i].Instances[0]
        instancesList += '  id: ' + ins.InstanceId + '  Status: ' + ins.State.Name + '\n';
        var params1 = {
            Filters: [{
                Name: "resource-id",
                Values: [
                    ins.InstanceId
                ]
            }]
        }
        ec2.describeTags(params1, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            //else console.log(data.Tags[0]);
             //data = JSON.parse(data).Tags
             for(var item of data.Tags) {
             console.log(item['Key'] + ':' + item['Value'])
             //console.log(item['Value'])
             }
        })
    }
    console.log(instancesList);
})
