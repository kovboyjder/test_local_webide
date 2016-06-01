sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/ui/model/Filter'
], function(Controller, JSONModel, Filter) {
	"use strict";

	return Controller.extend("sap.ui.table.sample.TreeTable.JSONTreeBinding.Controller", {

		onInit: function() {
			var oModel = new JSONModel("./Clothing.json");

			this.getView().setModel(oModel);
		},

		onRowChange: function(oEvt) {
			var sPath = "";
			var that = this;
			//Split the path into an array for us to loop through
			var split = oEvt.getParameters().rowContext.sPath.split("/");

			//Loop the array
			split.forEach(function(item, index) {
				//We skip the first tariffs in the array as there isn't a path in that.
				if (item === "tariffs" && index > 1) {
					console.log(that.getView().getModel().getProperty(sPath));
					sPath = sPath + '/' + item;
				} else if (item === "tariffs") {
					sPath = sPath + item;
				} else {
					sPath = sPath + '/' + item;
				}
			});

			console.log(that.getView().getModel().getProperty(oEvt.getParameters().rowContext.sPath));
		},

		onCollapseAll: function() {
			var oTreeTable = this.getView().byId("TreeTableBasic");
			oTreeTable.collapseAll();
		},

		onExpandAll: function() {
			var oTreeTable = this.getView().byId("TreeTableBasic");
			oTreeTable.expandToLevel(3);
		},

		onSearch: function(oEvt) {
			var list = this.getView().byId("TreeTableBasic");

			// add filter for search
			var aFilters = [];
			var sQuery = oEvt.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("name", sap.ui.model.FilterOperator.StartsWith, sQuery);
				aFilters.push(filter);
				list.expandToLevel(3);
			} else {
				list.collapseAll();
			}
			// update list binding
			var binding = list.getBinding("rows");
			binding.filter(aFilters, "Application");
		}

	});

});