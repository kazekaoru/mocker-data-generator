import * as R from 'randexp';
import * as f from 'faker';
var c = require('casual-browserify');
// import * as c from 'casual-browserify'
import { Chance } from 'chance';
var ch = new Chance();
import { fnParser, loopInside } from './utils';
var Generator = /** @class */ (function () {
    function Generator() {
    }
    Generator.prototype.faker = function (cfg) {
        var faker = f;
        var db = this.DB;
        var object = this.object;
        var re;
        var matches;
        var strFn;
        if (cfg.locale === '') {
            throw "Locale is empty '" + cfg.locale + "'.";
        }
        if (cfg.locale) {
            var supportedLocales = Object.keys(faker.locales);
            if (supportedLocales.indexOf(cfg.locale) === -1) {
                throw "Locale '" + cfg.locale + "' is not supported by faker.";
            }
            faker = require('faker/locale/' + cfg.locale);
        }
        if (cfg.eval) {
            re = /(^[a-zA-Z.]*)/; // aZ.aZ
            matches = re.exec(cfg.faker);
            if (matches && matches.length === 2) {
                strFn = 'faker.' + cfg.faker;
            }
            re = /\((.*?)\)/; // Match ()
            matches = re.exec(cfg.faker);
            if (!matches) {
                strFn = 'faker.' + cfg.faker + '()';
            }
            return eval(strFn);
        }
        else {
            return fnParser('faker', faker, cfg.faker);
        }
    };
    Generator.prototype.chance = function (cfg) {
        var chance = ch;
        if (cfg.eval) {
            var db = this.DB;
            var object = this.object;
            var re = /(^[a-zA-Z.]*)/; // aZ.aZ
            var matches = re.exec(cfg.chance);
            var strFn = void 0;
            if (matches && matches.length === 2) {
                strFn = 'chance.' + cfg.chance;
            }
            re = /\((.*?)\)/; // Match ()
            matches = re.exec(cfg.chance);
            if (!matches) {
                strFn = 'chance.' + cfg.chance + '()';
            }
            return eval(strFn);
        }
        else {
            return fnParser.call(chance, 'chance', chance, cfg.chance);
        }
    };
    Generator.prototype.casual = function (cfg) {
        var casual = c;
        if (cfg.eval) {
            var re = /(^[a-zA-Z.]*)/; // aZ.aZ
            var matches = re.exec(cfg.casual);
            var strFn = void 0;
            if (matches && matches.length === 2) {
                strFn = 'casual.' + cfg.casual;
            }
            return eval(strFn);
        }
        else {
            return fnParser.call(casual, 'casual', casual, cfg.casual);
        }
    };
    Generator.prototype.randexp = function (cfg) {
        return new R(cfg.randexp).gen();
    };
    Generator.prototype.self = function (cfg) {
        var object = this.object;
        return cfg.eval
            ? eval('object.' + cfg.self)
            : loopInside(this.object, cfg.self);
    };
    Generator.prototype.db = function (cfg) {
        var db = this.DB;
        if (cfg.eval) {
            return eval('db.' + cfg.db);
        }
        else {
            return loopInside(this.DB, cfg.db);
        }
    };
    Generator.prototype.eval = function (cfg) {
        var db = this.DB;
        var object = this.object;
        var faker = f;
        var chance = ch;
        var casual = c;
        var randexp = R;
        return eval(cfg.eval);
    };
    Generator.prototype.values = function (cfg) {
        var i = Math.floor(cfg.values.length * Math.random());
        return cfg.values[i];
    };
    Generator.prototype.function = function (cfg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var object = this.object;
        var db = this.DB;
        var faker = f;
        var chance = ch;
        var casual = c;
        var randexp = R;
        return (_a = cfg.function).call.apply(_a, [{ object: object, db: db, faker: faker, chance: chance, casual: casual, randexp: randexp }].concat(args));
        var _a;
    };
    Generator.prototype.static = function (cfg) {
        return cfg.static;
    };
    Generator.prototype.incrementalId = function (cfg) {
        var n = 0;
        var db = this.DB;
        if (db[this.name] && db[this.name].length) {
            n = db[this.name].length;
        }
        if (cfg.incrementalId === true) {
            cfg.incrementalId = '0';
        }
        return n + parseInt(cfg.incrementalId, 10);
    };
    Generator.prototype.hasOne = function (cfg) {
        var db = this.DB;
        var i = Math.floor(db[cfg.hasOne].length * Math.random());
        var entity = db[cfg.hasOne][i];
        if (cfg.get) {
            if (cfg.eval) {
                return eval('entity.' + cfg.get);
            }
            else {
                return loopInside(entity, cfg.get);
            }
        }
        else {
            return entity;
        }
    };
    Generator.prototype.hasMany = function (cfg) {
        var _this = this;
        var amount = 1;
        var db = this.DB;
        var min = cfg.min || cfg.min === 0 ? cfg.min : 1;
        var max = cfg.max ? cfg.max : cfg.hasMany ? db[cfg.hasMany].length : 1;
        if (cfg.amount) {
            amount = cfg.amount;
        }
        else {
            amount = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        var newCfg = {
            hasOne: cfg.hasMany,
            get: cfg.get ? cfg.get : undefined,
            eval: cfg.eval ? true : false
        };
        return Array.from(new Array(amount)).map(function () { return _this.hasOne(newCfg); });
    };
    return Generator;
}());
export { Generator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9HZW5lcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLENBQUMsTUFBTSxTQUFTLENBQUE7QUFDNUIsT0FBTyxLQUFLLENBQUMsTUFBTSxPQUFPLENBQUE7QUFDMUIsSUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUE7QUFDdEMseUNBQXlDO0FBQ3pDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFDL0IsSUFBTSxFQUFFLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQTtBQUV2QixPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxNQUFNLFNBQVMsQ0FBQTtBQUU5QztJQUFBO0lBK01BLENBQUM7SUFqTUcseUJBQUssR0FBTCxVQUFNLEdBQXVEO1FBQ3pELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQTtRQUNiLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUE7UUFDaEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQTtRQUN4QixJQUFJLEVBQUUsQ0FBQTtRQUNOLElBQUksT0FBTyxDQUFBO1FBQ1gsSUFBSSxLQUFLLENBQUE7UUFFVCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxzQkFBb0IsR0FBRyxDQUFDLE1BQU0sT0FBSSxDQUFBO1FBQzVDLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBRSxLQUFhLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDMUQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMs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