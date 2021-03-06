(function() {

	var module = angular.module("couponSystem");
	/**
	 * Get Coupon By Id controller with ngConfirm - A controller that allows the
	 * get of Coupon By a specific Id from the database, under Company
	 * permissions
	 */
	module.controller("GetCouponByIdCtrl", GetCouponByIdCtrlCtor);
	/**
	 * Get Coupon By Id CTOR. The constructor receives the answer from the
	 * service into the Promise, using the mainCompanyService. If the answer from
	 * Servis succeeded, the first function(resp) will run and return the answer
	 * to the client. If the answer from the service was unsuccessful, the error
	 * function will run.
	 */
	function GetCouponByIdCtrlCtor(mainCompanyService, $ngConfirm, $state,
			$scope) {
		var coupon = [];
		var self = this;
		/**
		 * onSubmit method To prevent execution by clicking on the form button
		 * and allow validation on the form by the required property in the form
		 * fields
		 */
		this.onSubmit = function(state) {
			if (state == true) {
				this.getId();
			}
		}
		/**
		 * get Id function. The method get the id as a parameter in sand it to
		 * the service and receives the answer from the service into the
		 * Promise, using the mainCompanyService. If the answer from Servis
		 * succeeded, the first function(resp) will run and return the answer to
		 * the client. If the answer from the service was unsuccessful, the
		 * error function will run.<br>
		 * for dialog with the client i use ngConfirm
		 */
		this.getId = function() {
			var promiseGet = mainCompanyService.getCouponById(this.id);
			promiseGet
					.then(
							function(resp) {

								self.coupon = resp.data;
							},

							function(err) {
								self.error = (err.data);
								// check if the client is loged to perform
								// actions
								if ((err.status) == 401) {
									$ngConfirm({
										theme : 'light',
										animation : 'rotateYR',
										closeAnimation : 'scale',
										animationSpeed : 500,
										boxWidth : '30%',
										useBootstrap : false,
										title : 'Login failed!',
										content : 'You must perform a login to perform actions',
										scope : $scope,
										buttons : {
											Yes : {
												text : 'Log Me In',
												btnClass : 'btn-purple',
												/**
												 * The client will be
												 * transferred to Logain
												 */
												action : function(button) {
													window.location.href = "http://localhost:8080/CouponWebService/Login/Login.html";

												}
											},
											/**
											 * The client will remain a logout
											 * and will not be able to perform
											 * operations
											 */
											No : function(button) {
											},
										}
									});

								} else {
									self.error = err.data;
									$ngConfirm({
										theme : 'light',
										animation : 'rotateYR',
										closeAnimation : 'scale',
										animationSpeed : 500,
										boxWidth : '30%',
										useBootstrap : false,
										title : 'A problem has occurred!',
										content : 'There may be no coupon with the ID youre looking for<br>Please try new ID!',
										scope : $scope,
										buttons : {
											Yes : {
												text : 'OK',
												btnClass : 'btn-purple',
											},
										}
									});
								}
							});
		}
	}

})();