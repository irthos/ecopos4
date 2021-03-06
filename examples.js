/**
 * Created by io on 5/20/2014.
 */

/*				$scope.fireRef = new Firebase('https://opentest.firebaseio.com/ui/admin/navigation/');
 $scope.fire = $firebase($scope.fireRef);
 $scope.fire.$add({icon:"mail-forward",name:"rightbar",actions:['rightsm','rightmd','rightlg']});
 */

/*
 <div class="stock col-xs-12">
 <span class="col-xs-5"><h1 data-fittext="1" data-fittext-min="16" data-fittext-max="56">Stock</h1></span>
 <span class="col-xs-7">
 <div><b>Filters:</b></div>
 <span class="col-xs-4 btn btn-default"  ng-click="stockOptions=!stockOptions">Options</span>
 <span class="col-xs-4 btn btn-default"  ng-click="propertyFilters=!propertyFilters">Properties</span>
 <span class="col-xs-4 btn btn-default"  ng-click="categories=!categories">Categories</span>
 </span>

 <div ng-if="inventory || $parent.inventory">Hello Specific Inventory Tree</div>

 <div ng-show="stockOptions">
 <span class="col-xs-3">
 <select ng-model="invShop" ng-change="shopSelected()" ng-options="shopID as shop.name for (shopID,shop) in shops">
 <option value="">-- choose shop --</option>
 </select>
 </span>
 <a class="col-xs-3" ng-click="stockShow('stock')" ng-class="{'btn': true, 'btn-default': show.stock}">Stock</a>
 <a class="col-xs-3" ng-click="stockShow('import')" ng-class="{'btn': true, 'btn-default': show.import}">Import</a>
 <a class="col-xs-3" ng-click="stockShow('createShop')" ng-class="{'btn': true, 'btn-default': show.createShop}">Create Shop</a>
 </div>

 <div ng-if="show.stock">

 <div ng-show="propertyFilters">
 <input type="checkbox" ng-model="filters.matchAll" id="filter-match-all" /> <label for="filter-match-all">Match All Criteria</label><br/>
 <label for="filter-name">Name</label> <input type="text" ng-model="filters.name" id="filter-name" /> <input type="checkbox" ng-model="filters.nameExact" id="filter-name-exact" /> <label for="filter-name-exact">Exact</label><br/>
 <label for="filter-upc">UPC</label> <input type="text" ng-model="filters.upc" id="filter-upc" /> <input type="checkbox" ng-model="filters.upcExact" id="filter-upc-exact" /> <label for="filter-upc-exact">Exact</label><br/>
 <label for="filter-price-low">Price</label> <input type="number" ng-model="filters.priceLow" id="filter-price-low" /> to <input type="number" ng-model="filters.priceHigh" id="filter-price-high" /><br/>
 <label for="filter-stock-low">Stock</label> <input type="number" ng-model="filters.stockLow" id="filter-stock-low" /> to <input type="number" ng-model="filters.stockHigh" id="filter-stock-high" />
 <input type="checkbox" ng-model="filters.changedProducts" id="filter-show-changed" /> <label for="filter-show-changed">Show changed</label><br/>
 </div>

 <div ng-if="catalog && categories">
 <script type="text/ng-template" id="category_tree_select.html">
 <input type="checkbox" ng-model="filters.selectedCats[parentName+'/'+childCat.name]" /> {{childCat.name}}
 <div ng-if="childCat.children">
 <span ng-repeat="childCat in childCat.children | orderByPriority | isCategory" ng-include="'category_tree_select.html'" onload="parentID=parentID+'/'+$parent.$parent.$parent.childCat.$id; parentName=parentName+(parentName?'/':'')+$parent.$parent.$parent.childCat.name"></span>
 </div>
 </script>

 <ul ng-if="catalog.children">
 <li ng-repeat="childCat in catalog.children | orderByPriority | isCategory" ng-include="'category_tree_select.html'" onload="parentID='';parentName=''"></li>
 </ul>
 </div>

 <div>
 {{filteredProductCount()}}/{{productCount()}} products.
 {{filters.selectedCats}}
 </div>

 <div ng-show="changedProductsCount()">
 {{changedProductsCount()}} products changed.
 <ul>
 <li ng-repeat="(changedID,changedFields) in changedProducts"><span ng-if="inventory[changedID]">{{inventory[changedID].name}}</span><span ng-if="!inventory[changedID]">{{changedID}}</span>: {{changedFields}}</li>
 </ul>
 <button class="btn btn-success">Save Products</button>
 </div>

 <div ng-show="inventory" class="row">
 <label for="showCount">Show: </label>
 <select id="showCount" ng-model="showCount" ng-change="setPageNumbers()">
 <option>20</option>
 <option>50</option>
 <option>100</option>
 <option>250</option>
 <option>500</option>
 <option>1000</option>
 <option>2500</option>
 <option>5000</option>
 </select>
 <div>
 Show: <span ng-repeat="sort in sortables | orderBy:'priority'">
 <input type="checkbox" ng-model="sort.show"> {{sort.name | uppercase}}</span>
 </div>
 <table class="stock col-xs-12">
 <thead>
 <tr>
 <th ng-repeat="sort in sortables | orderBy:'priority'" ng-if="sort.show"><a ng-click="sortBy(sort.name)">{{sort.name | uppercase}}</a><span ng-show="productOrder===sort.name"><span ng-show="!productReverse">*</span><span ng-show="productReverse">**</span></span></th>
 </tr>
 </thead>
 </table>
 </div>

 <div ng-show="inventory" class="row" style="height:400px;overflow-y:auto;overflow-x:hidden;" scroll-pages next-page="nextPage()" prev-page="prevPage()" back-scroll="true">
 <table class="stock col-xs-12">
 <tbody>
 <tr ng-repeat="(idx,product) in inventoryFiltered | orderBy:productOrder:productReverse | startAt:showOffset | limitTo:showCount" ng-class="{active: (focusProduct===product.$id), changed: (changedProducts[product.$id]?true:false)}">
 <td class="stock-list" ng-if="sort.show" ng-repeat="sort in sortables | orderBy:'priority'">
 <span ng-if="sort.type!=='select'">
 <input type="{{sort.type}}" ng-model="$parent.product[sort.name]" ng-change="productChanged($parent.product.$id, sort.name)" ng-focus="productFocus($parent.product.$id, sort.name)" ng-blur="productBlur($parent.product.$id, sort.name)" />
 </span>
 <span ng-if="sort.type==='select'">
 <span ng-if="sort.name==='category'">
 {{$parent.product.shops[invShop].categories}}
 </span>
 <span ng-if="sort.name!=='category'">
 {{$parent.product[sort.name]}}
 </span>
 </span>
 </td>
 </tr>
 </tbody>

 </table>
 </div>

 </div>

 <div ng-show="show.import">
 <div>
 <div>
 <select ng-model="importShop" ng-disabled="importing" multiple="multiple" ng-options="shopID as shop.name for (shopID,shop) in shops">
 <option value="">-- choose shop --</option>
 </select>
 <select ng-model="import" ng-disabled="importing" ng-options="importID as importer.name for (importID,importer) in importers">
 <option value="">-- choose import --</option>
 </select>
 </div>

 <div ng-show="import && importers[import] && importShop">
 <div ng-show="!importing">
 Import <strong>{{importers[import].name}}</strong> from <strong>{{importers[import]['raw-table']}}</strong>...<br/>
 <!-- Into <strong>{{shops[importShop].name}}</strong> @ <em>{{shops[importShop].catalog}}</em><br/ -->
 Into <span ng-repeat="cShop in importShop">
 <span ng-if="!$first">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
 <strong>{{shops[cShop].name}}</strong> @ <em>{{shops[cShop].catalog}}</em><br/>
 </span>

 <button ng-click="startImport()" class="btn btn-warning">Import!</button>
 </div>

 <div ng-show="importing">
 Importing <strong>{{importing.import.name}}</strong> from <strong>{{importing.import['raw-table']}}</strong>...<br/>
 <!-- Into <strong>{{importing.shop.name}}</strong> @ <em>{{importing.shop.catalog}}</em><br/ -->
 Into <span ng-repeat="cShop in importing.shop">
 <span ng-if="!$first">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
 <strong>{{cShop.name}}</strong> @ <em>{{cShop.catalog}}</em><br/>
 </span>
 Started at {{importing.startTime | date:'mediumTime'}} on {{importing.startTime | date:'shortDate'}}
 </div>
 </div>
 </div>

 <div ng-show="importHistory.length">
 <h4>History</h4>
 <ul>
 <li ng-repeat="history in importHistory"><strong>{{history.name}}</strong> into <strong ng-repeat="cShop in history.shop"><span ng-if="!$first">, </span>{{cShop.name}}</strong> @ {{history.start | date:'mediumTime'}} to {{history.finish | date:'mediumTime'}} ({{ (history.finish-history.start)/1000 }}s) on {{history.finish | date:'shortDate'}}</li>
 </ul>
 </div>
 </div>

 <div ng-show="show.createShop">
 <h3>Shop Maker</h3>

 <div>
 <label for="shopName">Name</label>
 <input type="text" ng-model="shopName" ng-change="autoBranchName()" id="shopName" placeholder="Shop Name" />
 </div>
 <div ng-show="mess" ng-model="mess">
 {{mess}}
 </div>
 <div>
 <button ng-click="createShop()" class="btn btn-success">Create Shop</button>
 </div>

 <h4>Active Shop</h4>
 {{activeShop}}
 <select ng-model="$parent.activeShop" ng-change="activateShop()">

 <option ng-repeat="(cShopID, cShop) in shops" ng-value="cShopID">{{cShop.name}}</option>
 </select>
 </div>
 </div>
 */