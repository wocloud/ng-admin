/**
 * Created by sophia.wang on 17/3/30.
 */
app.service('resourceService', ['$resource', '$q', 'fakeMapping', function($resource, $q, fakeMapping) {
    
    var self = this;
    
    var HostServiceURL = '/services/api';
    
    self.ResourceCMD = {
        'host_query'         : HostServiceURL + '/QueryHost',
        'host_create'        : HostServiceURL + '/AddKVMHost',
        'host_destroy'       : HostServiceURL + '/DeleteHost'
    };

    // before the ajax send
    function transfer(cmd, paramObj){
        if(!paramObj) {
            paramObj = {};
        }
        if(!paramObj.session) {
            paramObj.session = {"uuid": "2128afad35ab4857bca09a8437825f7e"};
        }
        var res_cmd = $resource(cmd, paramObj, {
            get: {method:'GET'},
            delete: {method:'DELETE'},
            post: {method:'POST',headers :{'Content-Type' : 'application/json;charset=UTF-8'}}
        });
        return res_cmd;
    }

    // api list
    self.host_query = function(params) {
        var res_cmd = transfer(self.ResourceCMD.host_query, params);
        fakeMapping.scheme(self.ResourceCMD.host_query, {
            '' : 'views/resources/host/host.json'
        });
        var task = $q.defer();
        res_cmd.post(params,function(response) {
            task.resolve(response.toJSON());
        });
        return task.promise;
    };

    self.host_create = function(params) {
        var res_cmd = transfer(self.ResourceCMD.host_create, params);
        var task = $q.defer();
        res_cmd.post(params,function(response) {
            task.resolve(response.toJSON());
        });
        return task.promise;
    };

    self.host_destroy = function(params) {
        var res_cmd = transfer(self.ResourceCMD.host_destroy, params);
        var task = $q.defer();
        res_cmd.post(params,function(response) {
            task.resolve(response.toJSON());
        });
        return task.promise;
    };

}]);
