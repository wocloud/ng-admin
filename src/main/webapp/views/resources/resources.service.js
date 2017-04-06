/**
 * Created by sophia.wang on 17/3/30.
 */
app.service('resourceService', ['$resource', '$q', 'fakeMapping', function($resource, $q, fakeMapping) {
    
    var self = this;
    
    var HostServiceURL = '/services/host',
        VmServiceURL = '/services/vm';

    self.ResourceCMD = {
        'host_query'         : HostServiceURL + '/QueryHost',
        'host_create'        : HostServiceURL + '/AddKVMHost',
        'host_destroy'       : HostServiceURL + '/DeleteHost',

        'vm_query'         : VmServiceURL + '/QueryVmInstance',
        'vm_create'        : VmServiceURL + '/AddKVMHost',
        'vm_destroy'       : VmServiceURL + '/DeleteHost'
    };

    // before the ajax send
    function transfer(cmd, paramObj){
        if(!paramObj) {
            paramObj = {};
        }
        if(!paramObj.session) {
            paramObj.session = {"uuid": "0c3dd7e478754452aea2f2fd483c85a3"};
        }
        var res_cmd = $resource(cmd, paramObj, {
            get: {method:'GET'},
            delete: {method:'DELETE'},
            post: {method:'POST',headers :{'Content-Type' : 'application/json;charset=UTF-8'}}
        });
        return res_cmd;
    }

    // api list
    /////////////////////  计算节点  //////////////////////////
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

    /////////////////////  虚拟机  //////////////////////////
    self.vm_query = function(params) {
        var res_cmd = transfer(self.ResourceCMD.vm_query, params);
        var task = $q.defer();
        res_cmd.post(params,function(response) {
            task.resolve(response.toJSON());
        });
        return task.promise;
    };

    self.vm_create = function(params) {
        var res_cmd = transfer(self.ResourceCMD.vm_create, params);
        var task = $q.defer();
        res_cmd.post(params,function(response) {
            task.resolve(response.toJSON());
        });
        return task.promise;
    };

    self.vm_destroy = function(params) {
        var res_cmd = transfer(self.ResourceCMD.vm_destroy, params);
        var task = $q.defer();
        res_cmd.post(params,function(response) {
            task.resolve(response.toJSON());
        });
        return task.promise;
    };

}]);
