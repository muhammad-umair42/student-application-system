import { Application } from '../models/application-model.js';

//Extracts The Data From Body
//Valide the Data
//Save The Data To MongoDB
//Return Response as new application
export const createApplication = async (req, res) => {
  try {
    const { title, description, status, id } = req?.body;

    //validating inputs
    if (!title || !description || !status || !id) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }

    //saving application to mongodb
    const application = await Application.create({
      title,
      description,
      status,
      user: id,
    });

    //returning response on successfully saving application
    if (application) {
      return res.status(201).json({ success: true, application });
    } else {
      //returning response on failing to save application
      return res.status(400).json({
        message: 'Opps Somethimg went wrong while creating application.',
      });
    }
  } catch (error) {
    //returning response on error
    return res
      .status(500)
      .json({ message: 'Internal server error While creating application' });
  }
};

//Extracts The Data From Body
//Valide the Data
//Get The Data From MongoDB based on user id and status
//Return Response
export const getApplications = async (req, res) => {
  try {
    const { status } = req.params;
    console.log(req.body);

    const { id } = req.body;

    //validating inputs
    if (!status || !id) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }

    //fetching applications from mongodb
    const applications = await Application.find({ status, user: id }).select(
      '_id title',
    );

    //returning response on successfully fetching applications
    if (applications) {
      return res.status(200).json({ success: true, applications });
    } else {
      //returning response on failing to fetch applications
      return res.status(400).json({ message: 'Applications not found' });
    }
  } catch (error) {
    //returning response on error
    return res
      .status(500)
      .json({ message: 'Internal server error while fetching applications' });
  }
};

//Extracts The Data From Body
//Valide the Data
//Get The Data From MongoDB based on application id
//Return Response
export const getApplication = async (req, res) => {
  try {
    const { applicationId } = req?.body;

    //validating inputs
    if (!applicationId) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }

    //fetching application from mongodb
    const application = await Application.findById(applicationId).select(
      'title description status remarks',
    );

    //returning response on successfully fetching application
    if (application) {
      return res.status(200).json({ success: true, application });
    } else {
      //returning response on failing to fetch application
      return res.status(400).json({ message: 'Application not found' });
    }
  } catch (error) {
    //returning response on error
    return res
      .status(500)
      .json({ message: 'Internal server error while fetching application' });
  }
};

//Extracts The Data From Body
//Valide the Data
//Saves the Application as pending
//Return Response
export const updateDraftApplication = async (req, res) => {
  try {
    const { title, description, applicationId } = req.body;

    //validating inputs
    if (!title || !description || !applicationId) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }

    const status = 'pending';

    //updating application in mongodb
    const application = await Application.findByIdAndUpdate(
      applicationId,
      { title, description, status },
      { new: true },
    );

    //returning response on successfully updating application
    if (application) {
      return res.status(200).json({ success: true, application });
    } else {
      //returning response on failing to update application
      console.log('elsehere');
      return res.status(400).json({ message: 'Application update failed' });
    }
  } catch (error) {
    //returning response on error
    return res.status(500).json({
      message: 'Internal server error while updating draft application',
    });
  }
};

//get user application id
//validate the data
//gets the application with user details populated as it is adimin function
//return response
export const getUserApplication = async (req, res) => {
  try {
    const { applicationId } = req.body;
    //validating inputs
    if (!applicationId) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }

    //fetching application from mongodb and populating user details
    const application = await Application.findById(applicationId).populate(
      'user',
      'displayName email department',
    );
    //returning response on successfully fetching application
    if (application) {
      return res.status(200).json({ success: true, application });
    } else {
      //returning response on failing to fetch application
      return res.status(400).json({ message: 'Application not found' });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: 'Internal server error while fetching user application',
      error: error?.message,
    });
  }
};

//get application id, status and remarks as it is admin function
//validate the data
//update the application status and adding remarks of the admin
//return response
export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId, status, remarks } = req.body;
    //validating inputs
    if (!applicationId || !status) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }
    //updating application status in mongodb
    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status, remarks },
      { new: true },
    );
    //returning response on successfully updating application status
    if (application) {
      return res.status(200).json({ success: true });
    } else {
      //returning response on failing to update application status
      return res.status(400).json({ message: 'Application update failed' });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error while updating application status',
    });
  }
};

//get all pending applications of all users as it is admin function
export const getAllPendingApplications = async (req, res) => {
  try {
    const applications = await Application.find({ status: 'pending' }).populate(
      'user',
      'displayName email department',
    );

    //returning response on successfully fetching pending applications
    if (applications) {
      return res.status(200).json({ success: true, applications });
    } else {
      //returning response on failing to fetch pending applications
      return res.status(400).json({ message: 'Applications not found' });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error while fetching pending applications',
    });
  }
};
