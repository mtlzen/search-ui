/// <reference path="../Test.ts" />

module Coveo {
  describe('SearchAlertsMessage', function () {
    let test: Mock.IBasicComponentSetup<SearchAlertsMessage>;

    beforeEach(() => {
      test = Mock.basicComponentSetup<SearchAlertsMessage>(SearchAlertsMessage);
      spyOn(PopupUtils, 'positionPopup');
    });
    
    afterEach(()=>{
      test = null;
    })
    
    it('should show a message when a subscription is created', ()=>{
      let subscription = {
        type: "followQuery",
        typeConfig: {
          query: {
            q: "test"
          }
        }
      };
      $$(test.env.root).trigger(SearchAlertEvents.searchAlertCreated, {dom: $$('div'), subscription: subscription});
      expect(PopupUtils.positionPopup).toHaveBeenCalled();
    })
    
    it('should show a message on error', ()=>{
      $$(test.env.root).trigger(SearchAlertEvents.SearchAlertsFail, {dom: $$('div').el});
      expect(PopupUtils.positionPopup).toHaveBeenCalled();
    })
    
    describe('showMessage', ()=>{
      
      it('should display the message', ()=>{
        let div = $$('div');
        let message = "Test";
        test.cmp.showMessage(div, message, false);
        expect($$((<jasmine.Spy>PopupUtils.positionPopup).calls.argsFor(0)[0]).find('.coveo-subscriptions-messages-content').innerText).toEqual(message);
      })
      
      it('should display an error if specified', ()=>{
        let div = $$('div');
        let message = "Test";
        test.cmp.showMessage(div, message, true);
        expect($$((<jasmine.Spy>PopupUtils.positionPopup).calls.argsFor(0)[0]).hasClass('coveo-subscriptions-messages-error')).toBe(true);
      })
      
    })

  });
};