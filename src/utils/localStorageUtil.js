import {debounce} from 'lodash';

const TABLE = "TABLE";
class LocalStorageUtil {

    constructor() {
        this._storeAvailable = null;
        this.update = debounce(this._update.bind(this), 1000);

        this._initialize();
    }

    _initialize() {
        this._storeAvailable = (typeof Storage !== "undefined");

        this._tableField = [];

        if (this._storeAvailable) {
            const userPreferencesString = localStorage.getItem(TABLE);

            if (userPreferencesString) {
                this.tableField = JSON.parse(userPreferencesString).map(task => ({
                    ...task,
                    createdDate: new Date(task.createdDate),
                    completedDate: new Date(task.completedDate)
                }));
            }
        }
    }

    get tableField() {
        this._checkIfInitialized();
        return this._tableField;
    }

    set tableField(newValues) {
        this._checkIfInitialized();
        this._tableField = [...newValues];
        this.update();
    }

    _checkIfInitialized() {
        if (this._storeAvailable == null) {
            throw new Error("LocalStorageUtil is not initialized! Please initialize it first!");
        }
    }

    /**
     * Use 'update' method which is debounced!
     * But it's better to call it in getters / setters just to keep simplicity using this service...
     */
    _update() {
        this._checkIfInitialized();        
        localStorage.setItem(TABLE, JSON.stringify(this._tableField));
    }

    /**
     * Do not call clear method to avoid unexpected exceptions of using it in other parts of apps!
     * Clean all used fields manually.
     */
    clear() {
        this._checkIfInitialized();
        localStorage.removeItem(TABLE);
    }
}

const instance = new LocalStorageUtil();

export default instance;
