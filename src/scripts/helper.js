export default {
  findDimension(dimension = [], key) {
    if (!Array.isArray(dimension) && dimension.length == 0) return "";
    return dimension.find((e) => e.Key == key)?.Value;
  },
  isFormReadonly(status = "") {
    const _status = status ?? "";
    return !["DRAFT", ""].includes(_status);
  },
  isShowLog(status = "") {
    const _status = status ?? "";
    return !["DRAFT", ""].includes(_status);
  },
  cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  gridColumnConfig(obj){
    const field = obj?.field ?? "field"
    const label = obj?.label ?? field
    const placeHolder  = obj?.input?.placeHolder ?? label
    const kind = obj?.kind ?? "text"
    
    const cfg = {
        field: field,
        kind: kind,
        label:label,
        labelField: "",
        readType: 'show',
        input: {
            lookupUrl:'',
            field: field,
            label:label,
            placeHolder: placeHolder,
            kind: kind,
            
        },
    }
    return {...cfg, ...obj}
  },
  defaultPayloadBuilder(search, cfg, val, take=20){
    const _cfg = cfg ?? {
      lookupKey: "_id",
      lookupLabels: ["_id", "Name"],
      lookupSearchs: ["_id", "Name"],
      multiple: false,
    }

    let qp = {}
    qp.Take = take
    qp.Sort = [_cfg.lookupLabels[0]]
    qp.Select = _cfg.lookupLabels 
    let idInSelect = false;
    const selectedFields = _cfg.lookupLabels.map(x => {
      if (x==cfg.lookupKey) {
        idInSelect = true;
      }
      return x;
    });
    if (!idInSelect) {
      selectedFields.push(_cfg.lookupKey);
    }
    qp.Select = selectedFields;

    //setting search
    if (search.length > 0 && _cfg.lookupSearchs.length > 0) {
      if (_cfg.lookupSearchs.length == 1)
        qp.Where = {
          Field: _cfg.lookupSearchs[0],
          Op: "$contains",
          Value: [search],
        };
      else
        qp.Where = {
          Op: "$or",
          items: _cfg.lookupSearchs.map((el) => {
            return { Field: el, Op: "$contains", Value: [search] };
          }),
        };
    }

    if (
      _cfg.multiple &&
      val &&
      val.length > 0 &&
      qp.Where != undefined
    ) {
      const whereExisting =
        _cfg.modelValue.length == 1
          ? { Op: "$eq", Field: _cfg.lookupKey, Value: val[0] }
          : {
              Op: "$or",
              items: val.map((el) => {
                return { Field: _cfg.lookupKey, Op: "$eq", Value: el };
              }),
            };

      qp.Where = { Op: "$or", items: [qp.Where, whereExisting] };
    }
    return qp

  },
  payloadBuilderDimension(list, val, mutliple = false, search) {
    const cfg = {lookupKey:"_id",lookupLabels: ["Label"],lookupSearchs:["_id", "Label"],mutliple: mutliple }
    let qp =  this.defaultPayloadBuilder(search, cfg, val)
  
    if (qp.Where != undefined) {
      const items = [{ Op: "$contains", Field: `_id`, Value: list }];

      items.push(qp.Where);
      qp.Where = {
        Op: "$and",
        items: items,
      };
    } else {
      qp.Where = { Op: "$contains", Field: `_id`, Value: list };
    }
    return qp;
  },
  payloadBuilderTaxCodes(search,cfg,val, modules){
    let qp =  this.defaultPayloadBuilder(search, cfg, val)
    if (qp.Where != undefined) {
        const items = [{Op: "$contains", Field: `Modules`, Value: [modules]}];
        items.push(qp.Where);
        qp.Where = {
            Op: "$and",
            items: items,
        };
    } else {
        qp.Where = {Op: "$contains", Field: `Modules`, Value:  [modules]};
    }
    return qp
  },  
  ItemVarian(ItemID, SKU) {
    let ItemVarian = "";
    if (ItemID && SKU) {
      ItemVarian = `${ItemID}~~${SKU}`;
    } else if (ItemID) {
      ItemVarian = ItemID;
    }
    return ItemVarian;
  },
};
