using System;
using System.Collections.Generic;
using System.Linq;
using Document.Management.System.Business.Services;
using Document.Management.System.DataAccess.SQLDB.Interfaces.Repositories;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace DocumentManagementSystemBusiness.Tests
{
    [TestClass]
    public class DocumentServiceTest
    {
        Mock<IGenericRepository<Document.Management.System.DataAccess.SQLDB.Models.Document>> _documentRepository;
        DocumentService documentService;
        Document.Management.System.Business.Contracts.Document documentContract;
        Document.Management.System.DataAccess.SQLDB.Models.Document document;
        [TestInitialize]
        public void TestInitialize()
        {
            var now = DateTime.Now;
            documentContract= new Document.Management.System.Business.Contracts.Document()
            {
                ID=1,
                UploadDate = now,
                LastAccessedDate = now,
                LastAccessedUser = "Hend",
                FileSize = 500,
                FileName = "Hend-File.png",
                FilePhysicalName = "HendPhysical-File.png",
            };
             document = new Document.Management.System.DataAccess.SQLDB.Models.Document()
            {
                ID = 1,
                UploadDate = now,
                LastAccessedDate = now,
                LastAccessedUser = "Hend",
                FileSize = 500,
                FileName = "Hend-File.png",
                FilePhysicalName = "HendPhysical-File.png",
            };
            _documentRepository = new Mock<IGenericRepository<Document.Management.System.DataAccess.SQLDB.Models.Document>>();
            _documentRepository.Setup(x => x.Insert(document));
        }

       
        [TestMethod]
        public void SaveFile_Success()
        {
            //arrange
            documentService = new DocumentService (_documentRepository.Object);
            documentService.saveFile(documentContract);
            //act
        }
        [TestMethod]
        public void GetFileById_Success()
        {
            //arrange
            _documentRepository.Setup(x => x.GetById(1)).Returns(document);
            documentService = new DocumentService(_documentRepository.Object);
            Document.Management.System.DataAccess.SQLDB.Models.Document d= documentService.GetById(documentContract.ID);
            //act
            Assert.AreEqual(d.FileName, "Hend-File.png");

        }
        [TestMethod]
        public void GetAllFiles_Success()
        {
            //arrange
            _documentRepository.Setup(x => x.GetAll()).Returns(new List<Document.Management.System.DataAccess.SQLDB.Models.Document>() { document });
            documentService = new DocumentService(_documentRepository.Object);
            var d = documentService.GetAll();
            //act
            Assert.AreEqual(d.Count(), 1);

        }
    }
}
