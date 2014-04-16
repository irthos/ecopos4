angular.module('ecoposApp').directive('messages', function(system, syncData, $timeout, $log) {
	return {
		restrict: 'EA',
		replace: true,

		templateUrl: 'views/tools/tool/messages/messages.html',
		link: function(scope, element, attrs, fn) {

            scope.text = {new:''};
            scope.subject = '';

            scope.sendMessage = function(messageID, index){
                if(messageID && scope.user.messages){
                    var message = null;
                    if(scope.user.messages.unseen[messageID]){
                        message = scope.user.messages.unseen[messageID];
                    }
                    else if(scope.user.messages.seen[messageID]){
                        message = scope.user.messages.seen[messageID];
                    }

                    if(message){
                        system.api.sendMessage(message, scope.user.id, scope.text[index]);
	                    scope.text[index] = null;
                    }
                }
            };

            scope.startConversation = function(){
                system.api.createConversation(scope.subject, scope.user.id, scope.sendTo, scope.text.new);
            };
		}
	};
});
