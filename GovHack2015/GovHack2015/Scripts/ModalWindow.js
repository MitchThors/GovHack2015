$(function () {
    // Initialize modal dialog attach modal-container bootstrap attributes to links with .modal-link class.
    // when a link is clicked with these attributes, bootstrap will display the href content in a modal dialog.
    $('body').on('click', '.modal-link', function (e) {
        e.preventDefault();
        $(this).attr('data-target', '#modal-container');
        $(this).attr('data-toggle', 'modal');
    });

    // Attach listener to .modal-close-btn's so that when the button is pressed the modal dialog disappears
    $('body').on('click', '.modal-close-btn', function () {
        $('#modal-container').modal('hide');
    });

    //clear modal cache, so that new content can be loaded
    $('body').on('hidden.bs.modal', '#modal-container', function() {
        $(this).removeData('bs.modal');
    });
    
    $('#cancelModal').on('click', function () {
        return false;
    });


    $('body').on('click', '#ShowVariationsModal', function (e) {
        e.preventDefault();
        $('#variation-modal-container').modal('show');
    });

    $('body').on('click', '#ShowJackpotsModal', function (e) {
        e.preventDefault();
        $('#jackpots-modal-container').modal('show');
    });

    $('body').on('click', '#ShowKeyLayoutModal', function (e) {
        e.preventDefault();
        $('#keylayout-modal-container').modal('show');
    });

    $('body').on('click', '#ShowBaseConfigurationModal', function (e) {
        e.preventDefault();
        $('#baseconfiguration-modal-container').modal('show');
    });

    $('body').on('click', '#ShowConditionsModal', function (e) {
        e.preventDefault();
        $('#conditions-modal-container').modal('show');
    });

    $('body').on('click', '#ShowInstallNotesModal', function (e) {
        e.preventDefault();
        $('#installnotes-modal-container').modal('show');
    });
});


