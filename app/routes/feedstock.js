const router = require("express").Router();

const feedstockController = require('../controller/feedstock');

//API ROUTES
router.get('/manage', feedstockController.manage);

router.post('/save', feedstockController.save);
router.get('/id/:id', feedstockController.findById);
router.get('/filter', feedstockController.filter);
router.delete('/remove', feedstockController.remove);

router.get('/request', feedstockController.request);
router.post('/request/save', feedstockController.requestSave);
router.post('/request/filter', feedstockController.requestFilter);
router.get('/request/id/:id', feedstockController.requestFindById);
router.put('/request/confirm', feedstockController.requestConfirm);

router.get('/regress', feedstockController.regress);
router.post('/regress/save', feedstockController.regressSave);
router.post('/regress/filter', feedstockController.regressFilter);
router.get('/regress/id/:id', feedstockController.regressFindById);
router.put('/regress/confirm', feedstockController.regressConfirm);

router.get('/supplier', feedstockController.supplier);
router.post('/supplier/create', feedstockController.supplierCreate);
router.get('/supplier/filter', feedstockController.supplierFilter);
router.get('/supplier/id/:id', feedstockController.supplierFindById);
router.post('/supplier/storage/add', feedstockController.supplierAddFeedstock);
router.get('/supplier/storage/remove/id/:id', feedstockController.supplierRemoveFeedstock);
router.get('/supplier/storage/list/id/:id', feedstockController.supplierStorageList);

router.get('/purchase', feedstockController.purchase);
router.get('/purchase/manage', feedstockController.purchaseManage);
router.post('/purchase/save', feedstockController.purchaseSave);
router.put('/purchase/confirm', feedstockController.purchaseConfirm);
router.get('/purchase/id/:id', feedstockController.purchaseFindById);
router.post('/purchase/filter', feedstockController.purchaseFilter);

router.get('/storage', feedstockController.storage);
router.get('/storage/manage', feedstockController.storageManage);
router.put('/storage/manage/amount/set', feedstockController.setStorageAmount);
router.post('/storage/create', feedstockController.storageCreate);
// router.get('/storage/list', feedstockController.storageList);
router.get('/storage/filter', feedstockController.storageFilter);

module.exports = router;